import Actor from "@/components/pages/actor";
import actorApi from "@/features/actors/api";
import { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  try {
    const { id } = await params;
    const { name } = await actorApi.fetchActorDetailsData(id);

    return {
      title: `Hellotv | Diễn viên ${name}`,
      description: `Danh sách phim của diễn viên ${name}`,
    };
  } catch (error) {
    console.log(error);
  }
  return {
    title: "Hellotv | Diễn viên",
  };
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  return <Actor actorId={id} />;
}
