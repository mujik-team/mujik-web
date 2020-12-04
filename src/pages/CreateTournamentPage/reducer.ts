export function reducer(state: typeof FormState, action: FormActions) {
  const { key, value } = action.payload;
  const form: any = state.form;

  switch (action.type) {
    case "form-update":
      form[key] = value;
      return { ...state, form };
    case "restriction-update":
      const restrictions: any = form.restrictions;
      restrictions[key] = value;
      return { ...state, form };
    default:
      return state;
  }
}
var now = new Date();
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

export const FormState = {
  isValid: true,
  form: {
    title: "",
    description: "",
    restrictions: {},
    coins: 500,
    winnerBy: "community",
    submissionDate: now.toLocaleDateString("en-us"),
    voteDate: tomorrow.toLocaleDateString("en-us"),
  },
};

export type FormActions = {
  type: "form-update" | "submit" | "restriction-update";
  payload: any;
};
