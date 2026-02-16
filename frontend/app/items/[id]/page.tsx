import { redirect } from "next/navigation";

export default async function Item({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  redirect(`/feed?article=${id}`);
}
