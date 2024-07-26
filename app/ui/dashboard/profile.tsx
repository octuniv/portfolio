import { fetchUser } from "@/app/lib/data";
import { userKeys } from "@/app/lib/definition";
import { EditUser, HiddenableButtons } from "@/app/ui/dashboard/buttons";
import {
  CreditCardIcon,
  EnvelopeIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import React from "react";

export function ProfileSkeleton() {
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
      <span className="inline">{label}</span>
    </div>
  );
}

export default async function Profile() {
  const { name, email, socialSites } = await fetchUser();

  return (
    <>
      <p className="text-4xl font-medium">Résumé</p>
      <div className="my-6" key="nameEmail">
        <IconWithLabel Icon={CreditCardIcon} label={name} key={name} />
        <IconWithLabel Icon={EnvelopeIcon} label={email} key={email} />
      </div>
      <div className="my-6" key="socialSites">
        {socialSites.map((site, ind) => (
          <IconWithLabel
            Icon={ChatBubbleLeftEllipsisIcon}
            label={site}
            key={`${site}${ind}`}
          />
        ))}
      </div>
      <HiddenableButtons>
        <EditUser />
      </HiddenableButtons>
    </>
  );
}
