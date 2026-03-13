import { Icon } from "@iconify/react";

function MyPageHeader({ title, icon }: { title: string; icon: string }) {
  return (
    <h1 className="font-bold font-1 text-3xl flex items-center gap-2 ml-6">
      <Icon icon={icon} />
      {` ${title}`}
    </h1>
  );
}

export default MyPageHeader;
