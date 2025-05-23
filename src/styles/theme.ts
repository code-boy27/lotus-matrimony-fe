export const gradientStyles = {
  // Background gradients
  background: "bg-gradient-to-br from-rose-400 via-pink-500 to-orange-400",
  hover: "hover:from-rose-500 hover:via-pink-600 hover:to-orange-500",
  textGradient: "bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400",
  overlay: "bg-gradient-to-tr from-pink-600/30 to-orange-600/30",
  glow: "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent",

  // Button styles
  button: {
    primary:
      "bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400 hover:from-rose-500 hover:via-pink-600 hover:to-orange-500",
    secondary:
      "bg-gradient-to-r from-rose-300 via-pink-400 to-orange-300 hover:from-rose-400 hover:via-pink-500 hover:to-orange-400",
  },

  // Text styles
  text: {
    gradient:
      "bg-gradient-to-r from-rose-400 via-pink-500 to-orange-400 bg-clip-text text-transparent",
    shadow: "drop-shadow-lg",
  },

  // Card styles
  card: {
    gradient:
      "bg-gradient-to-br from-rose-400/10 via-pink-500/10 to-orange-400/10",
    border: "border border-rose-100",
    shadow: "shadow-lg",
  },

  // Animation styles
  animation: {
    hover: "transition-all duration-300 ease-in-out",
    scale: "hover:scale-105",
  },
};
