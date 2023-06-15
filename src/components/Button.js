export default function Button({ onClick, value, className }) {
   return (
      <button onClick={onClick} className={className}>
         {value}
      </button>
   );
}
