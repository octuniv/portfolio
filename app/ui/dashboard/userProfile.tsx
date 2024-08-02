import { fetchUser } from "@/app/lib/data";
import { userKeys } from "@/app/lib/definition";
import { AlignRightButtons, EditUser } from "@/app/ui/dashboard/buttons";
import {
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export function UserProfileSkeleton() {
  return (
    <>
      {userKeys.map((key) => (
        <p key={key}>{key} : loading...</p>
      ))}
    </>
  );
}

function IconWithLabel({
  Icon,
  label,
}: {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
}) {
  return (
    <div className="block my-2">
      <Icon className="inline w-5 mr-2" />
      <span className="inline break-words">{label}</span>
    </div>
  );
}

function Title({ title }: { title: string }) {
  return <h1 className="my-4 ml-4 text-5xl font-medium font-name">{title}</h1>;
}

export default async function UserProfile() {
  const { name, email, phone, socialSites } = await fetchUser();

  return (
    <>
      <Title title={name} />
      <div className="relative rounded-xl bg-purple-50 bg-opacity-80 mt-2 ml-3 mr-5 pl-3">
        <div className="mt-6 pt-1" key="nameEmail">
          <IconWithLabel
            Icon={DevicePhoneMobileIcon}
            label={phone}
            key={phone}
          />
          <IconWithLabel Icon={EnvelopeIcon} label={email} key={email} />
          {socialSites.map((site, ind) => (
            <IconWithLabel
              Icon={ChatBubbleLeftEllipsisIcon}
              label={site}
              key={`${site}${ind}`}
            />
          ))}
        </div>
        <AlignRightButtons>
          <EditUser />
        </AlignRightButtons>
      </div>
    </>
  );
}
