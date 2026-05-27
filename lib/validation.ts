import { z } from "zod";

export const waitlistSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.email("Please enter a valid email address"),
  type: z.enum(["Regular", "Creator"]),
  // Added artFocus to match your component's state
  artFocus: z.string().optional(), 
});

export type WaitlistData = z.infer<typeof waitlistSchema>;