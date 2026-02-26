import { ContainerPage } from "@/components/container";
import { MainLoading } from "./_components/_loading/main";

const Loading = () => {
  return (
    <ContainerPage breadcrumbs={[{ label: "Home" }]}>
      <MainLoading />
    </ContainerPage>
  );
};

export default Loading;
