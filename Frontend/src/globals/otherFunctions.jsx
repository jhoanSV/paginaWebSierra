export const Formater = (number) => {
    return new Intl.NumberFormat().format(number);
};