export function reducer(state: typeof FormState, action: FormActions) {
  switch (action.type) {
    case "form-update":
      const { key, value } = action.payload;
      const form: any = state.form;
      form[key] = value;
      return { ...state, form };
    default:
      return state;
  }
}

export const FormState = {
  isValid: true,
  form: {
    title: "",
    description: "",
    restrictions: {},
    coins: 500,
    winnerBy: "community",
  },
};

export type FormActions = { type: "form-update" | "submit"; payload: any };
