export default function Button({ disabled, onClick, value, className }) {
   return (
      <button disabled={disabled} onClick={onClick} className={className}>
         {value}
      </button>
   );
}
