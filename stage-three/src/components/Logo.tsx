export function ChuckyLogo({ className }: { className: string }) {
  return (
    <img
      src="/chucky.webp"
      alt="chucky logo"
      className={`${className}  rounded-full object-center object-cover `}
    />
  );
}

export function UserLogo({ className }: { className: string }) {
  return (
    <img
      src="/user.png"
      alt="user logo"
      className={`${className}  rounded-full object-center object-cover `}
    />
  );
}
