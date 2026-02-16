import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeAiSummaryToJsonb1771227719551 implements MigrationInterface {
  name = "ChangeAiSummaryToJsonb1771227719551";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "articles"
            ALTER COLUMN "ai_summary"
            SET DATA TYPE jsonb
            USING jsonb_build_array(jsonb_build_object('emoji', '📝', 'text', "ai_summary"))
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "articles"
            ALTER COLUMN "ai_summary"
            SET DATA TYPE text
            USING (
                SELECT string_agg(elem->>'text', '')
                FROM jsonb_array_elements("ai_summary") AS elem
            )
        `);
  }
}
