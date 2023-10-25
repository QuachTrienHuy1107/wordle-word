export const STATUS = {
    correctPos: "CORRECT_POS",
    wrongPos: "WRONG_POS",
    normal: "NORMAL"
};

export function ReplaceCharacter(string, index, replacement) {
    return string.substring(0, index) + replacement + string.substring(index + 1);
}
