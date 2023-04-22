import ReactInputMask from "react-input-mask";
import Input from "./Input";

export default function MaskedInput({ amount, setAmount, disabled }) {
  return (
    <ReactInputMask
      mask="R$ 9999999999"
      alwaysShowMask={false}
      maskPlaceholder=""
      beforeMaskedStateChange={maskToCurrency}
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      disabled={disabled}
    >
      <Input type="text" name="amount" placeholder="valor" />
    </ReactInputMask>
  );
}

function maskToCurrency({ nextState }) {
  const { value } = nextState || {};

  let amountFormatted = value?.replace?.(/\D/g, "");
  amountFormatted = amountFormatted?.replace?.(/^0+/g, "");

  if (amountFormatted?.length === 2) {
    return {
      ...nextState,
      value: `R$ ${amountFormatted}`,
      selection: {
        start: amountFormatted.length + 3,
        end: amountFormatted.length + 3,
      },
    };
  }

  const amountFormattedWithComma = amountFormatted?.replace?.(
    /(?=\d{2})(\d{2})$/,
    ",$1"
  );
  const amountFormattedWithDot = amountFormattedWithComma?.replace?.(
    /(\d)(?=(\d{3})+(?!\d))/g,
    "$1."
  );

  if (amountFormattedWithDot) {
    return {
      ...nextState,
      value: `R$ ${amountFormattedWithDot}`,
      selection: {
        start: amountFormattedWithDot.length + 3,
        end: amountFormattedWithDot.length + 3,
      },
    };
  }

  return nextState;
}
