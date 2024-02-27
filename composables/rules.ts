export const fieldRule = () => {
  const text = [
    (value: string) => {
      if (value) return true;
      return "This field is required.";
    },
  ];

  return text;
};

export const userRule = () => {
  const user = [
    (value: string) => {
      if (value) return true;
      return "Full name is required.";
    },
  ];

  return user;
};

export const emailRule = () => {
  const email = [
    (value: string) => {
      if (value) return true;
      return "E-mail is required.";
    },
    (value: string) => {
      if (/.+@.+\..+/.test(value)) return true;
      return "E-mail must be valid.";
    },
  ];

  return email;
};

export const passwordRule = () => {
  const passwordSign = [
    (value: string) => !!value || "This field is required.",
    (v: string) => v.length >= 8 || "Min 8 characters",
  ];

  const passwordLog = [(value: string) => !!value || "This field is required."];

  return {
    passwordSign,
    passwordLog,
  };
};

export const rules = () => {
  [
    (value: any) => {
      return (
        !value ||
        !value.length ||
        value[0].size < 2000000 ||
        "Avatar size should be less than 2 MB!"
      );
    },
  ];
};
