import { ReactElement } from "react";

interface Props {
  text: string;
  user?: string;
  our: boolean;
  followUp?: boolean;
}

function Bubble({ text, our, followUp = false }: Props): ReactElement<Props> {
  // messages sent by us
  if (our) {
    return (
      <div className="flex flex-col leading-tight self-end items-end">
        {/* message */}
        <div className="relative inline-block py-2 px-3 rounded-lg max-w-lg min-w-fit self-end bg-indigo-200">
          <span className="relative break-all z-20 text-slate-900">{text}</span>
          {/* arrow */}
          {!followUp && (
            <span className="absolute inline-block select-none w-4 h-4 transform rotate-45 top-2.5 z-10 bg-indigo-200 -right-1" />
          )}
        </div>
      </div>
    );
  }

  /*
    {user && (
      <span className="text-xs pl-0.5 select-none truncate text-left inline-block max-w-sm h-auto font-medium text-slate-900 content">
        {user}
      </span>
    )}
  */

  // messages received
  return (
    <div className="flex flex-col leading-tight self-start items-start">
      {/* TODO: user name will be shown here */}

      {/* message */}
      <div className="relative inline-block py-2 px-3 rounded-lg max-w-lg min-w-fit self-start bg-slate-100">
        <span className="relative break-all z-20 text-slate-900">{text}</span>
        {/* arrow */}
        <span className="absolute inline-block select-none w-4 h-4 transform rotate-45 top-2.5 z-10 bg-slate-100 -left-1" />
      </div>
    </div>
  );
}

export default Bubble;
