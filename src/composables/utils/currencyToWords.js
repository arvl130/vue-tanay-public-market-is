/********************************************************
 * @function    : currencyToWords(number, currancy, [format])
 * @purpose     : Converts Currency to Words
 * @version     : 1.00
 * @author      : Mohsen Alyafei
 * @licence     : MIT
 * @date        : 27 Feb 2022
 * @param       : number   [required] numeric or string
 *                curr [required] object description
 *                format   [optional] with the following parameters:
 *                minor: 'numeric' or 'fraction' or none (default)
 * @returns     : {string} Currency String in Words
 ********************************************************/

export default (num = 0, curr, format = {}) => {
  format = format.minor;
  format ?? "";
  num = (num += "").split((0.1).toLocaleString().substring(1, 2));
  let frc = (num[1] + "000").substring(0, curr.fraction),
    a = ", and ",
    cc =
      " " +
      curr.country +
      (curr.country ? " " : "") +
      (num[0] > 1 ? curr.majorPlural : curr.majorSingle),
    out = numToWords(num[0]) + (format == "fraction" && num[1] ? "" : cc);
  if (num[1]) {
    let sub = frc > 1 ? curr.minorPlural : curr.minorSingle;
    if (format == "numeric") out += a + +frc + " " + sub;
    else if (format == "fraction")
      out += a + +frc + "/1" + "0".repeat(curr.fraction) + cc;
    else out += a + numToWords(frc) + " " + sub;
  }
  return out;
  //----------------------------------------------------------------
  function numToWords(num = 0) {
    if (num == 0) return "Zero";
    num = ("0".repeat((2 * (num += "").length) % 3) + num).match(/.{3}/g);
    let out = "",
      T10s = [
        "",
        "One",
        "Two",
        "Three",
        "Four",
        "Five",
        "Six",
        "Seven",
        "Eight",
        "Nine",
        "Ten",
        "Eleven",
        "Twelve",
        "Thirteen",
        "Fourteen",
        "Fifteen",
        "Sixteen",
        "Seventeen",
        "Eighteen",
        "Nineteen",
      ],
      T20s = [
        "",
        "",
        "Twenty",
        "Thirty",
        "Forty",
        "Fifty",
        "Sixty",
        "Seventy",
        "Eighty",
        "Ninety",
      ],
      sclT = ["", "Thousand", "Million", "Billion", "Trillion", "Quadrillion"];
    return (
      num.forEach((n, i) => {
        if (+n) {
          let h = +n[0],
            t = +n.substring(1),
            scl = sclT[num.length - i - 1];
          out +=
            (out ? " " : "") +
            (h ? T10s[h] + " Hundred" : "") +
            (h && t ? " " : "") +
            (t < 20 ? T10s[t] : T20s[+n[1]] + (+n[2] ? "-" : "") + T10s[+n[2]]);
          out += (out && scl ? " " : "") + scl;
        }
      }),
      out
    );
  }
};
