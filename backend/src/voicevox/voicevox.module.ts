import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { HTTP_TIMEOUT_MS } from "./constants/voicevox.constants";
import { VoicevoxController } from "./voicevox.controller";
import { VoicevoxService } from "./voicevox.service";

@Module({
  imports: [
    HttpModule.register({
      timeout: HTTP_TIMEOUT_MS,
    }),
  ],
  controllers: [VoicevoxController],
  providers: [VoicevoxService],
  exports: [VoicevoxService],
})
export class VoicevoxModule {}
