

interface AuthTemplate {
  Method: "Login" | "Signup";
  //   onSubmit: () => void;
}
interface VerificationEmailProps {
  otp: string;
}

// const emailSchema = z.object({
//   email: z.string().email(),
//   otp: z.string().min(6).max(6),
// });

// export type EmailService = z.infer<typeof emailSchema>;
