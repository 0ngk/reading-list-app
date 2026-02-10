import { z } from "zod";

export const textToSpeechQuerySchema = z
  .object({
    text: z.string().min(1),
    styleId: z
      .string()
      .transform((value, ctx) => {
        const parsed = Number.parseInt(value, 10);
        if (Number.isNaN(parsed)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "styleId must be a number",
          });
          return z.NEVER;
        }
        return parsed;
      })
      .optional(),
  })
  .strict();

export const textToSpeechOptionsSchema = z
  .object({
    speedScale: z.number(),
    pitchScale: z.number(),
    intonationScale: z.number(),
    volumeScale: z.number(),
    prePhonemeLength: z.number(),
    postPhonemeLength: z.number(),
    pauseLengthScale: z.number(),
    outputSamplingRate: z.number(),
    outputStereo: z.boolean(),
    enableInterrogativeUpspeak: z.boolean(),
  })
  .partial()
  .strict();

export type TextToSpeechQueryDto = z.infer<typeof textToSpeechQuerySchema>;
export type TextToSpeechOptionsDto = z.infer<typeof textToSpeechOptionsSchema>;
