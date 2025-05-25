import useGetVideo from "../hooks/useGetVideo";

type VideoDetailsProps = {
  slug: string;
};

export default function VideoDetails({ slug }: VideoDetailsProps) {
  const { data, isLoading } = useGetVideo(slug);

  if (!data || isLoading) return <>Loading...</>;
  return <div>VideoDetails</div>;
}
