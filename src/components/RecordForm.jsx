import Form from "./Form";
import MaskedInput from "./MaskedInput";
import Input from "./Input";
import SubmitButton from "./SubmitButton";
import SubmitLoader from "./SubmitLoader";

export default function RecordForm({
  amount,
  setAmount,
  description,
  setDescription,
  submitButtonText,
  disabled,
}) {
  return (
    <Form method="post">
      <MaskedInput amount={amount} setAmount={setAmount} disabled={disabled} />
      <Input
        required
        type="text"
        name="description"
        placeholder="descrição"
        disabled={disabled}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <SubmitButton type="submit" disabled={disabled}>
        {disabled ? <SubmitLoader /> : submitButtonText}
      </SubmitButton>
    </Form>
  );
}
