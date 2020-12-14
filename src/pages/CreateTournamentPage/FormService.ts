export function reducer(
  state: typeof FormState,
  action: FormActions
): typeof FormState {
  const { key, value } = action.payload;
  const form: any = state.form;

  switch (action.type) {
    case "form-update":
      form[key] = value;
      return { ...state, form };
    case "invalid-form":
      const errors = action.payload.errors;
      return { ...state, isValid: false, formErrors: [...errors] };
    case "valid-form":
      return { ...state, isValid: true, formErrors: [] };
    case "restriction-update":
      const restrictions = form.restrictions;
      restrictions[key] = value;
      return { ...state, form };
    case "tournament-image-update":
      const { image } = action.payload;
      return { ...state, tournamentImage: image };
    default:
      return state;
  }
}

var now = new Date();
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const FormState = {
  isValid: true,
  formErrors: [] as FormError[],
  tournamentImage: null as any,
  form: {
    title: "",
    description: "",
    restrictions: {} as any,
    coins: 500,
    winnerBy: "community",
    submissionDate: now,
    voteDate: tomorrow,
  },
};

export interface FormActions {
  type:
    | "form-update"
    | "invalid-form"
    | "valid-form"
    | "submit"
    | "tournament-image-update"
    | "restriction-update";
  payload: any;
}

export interface FormError {
  fieldName: string;
  errorDescription: string;
}

export function validateForm(form: typeof FormState.form, userProfile: any) {
  const {
    title,
    description,
    coins,
    restrictions,
    voteDate,
    submissionDate,
  } = form;
  const userCoins = userProfile.coins || 0;

  const errors: FormError[] = [];

  // Check if fields are empty or not.
  if (title.trim().length < 5)
    errors.push({
      fieldName: "Title",
      errorDescription: "Must be longer than 5 characters.",
    });

  if (description.trim().length < 30)
    errors.push({
      fieldName: "Prompt",
      errorDescription: "Please provide a longer prompt.",
    });

  if (userCoins - coins < 0)
    errors.push({
      fieldName: "Coins",
      errorDescription: "User doesn't have enough coins.",
    });

  const min_time = restrictions["min_time"];
  const max_time = restrictions["max_time"];
  if (min_time && max_time) {
    if (min_time > max_time)
      errors.push({
        fieldName: "Time Duration",
        errorDescription: "Please check restrictions for Min. and Max time.",
      });
  }

  const min_songs = restrictions["min_songs"];
  const max_songs = restrictions["max_songs"];
  if (min_songs && max_songs) {
    if (min_songs > max_songs)
      errors.push({
        fieldName: "Number of Songs",
        errorDescription:
          "Please check restrictions for Min. and Max number of songs.",
      });
  }

  if (submissionDate > voteDate) {
    errors.push({
      fieldName: "Tournament Deadlines",
      errorDescription: "Please check tournament deadlines.",
    });
  }

  return errors;
}
