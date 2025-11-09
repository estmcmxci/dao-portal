import Link from "next/link"
import { MessageCircle, Wallet, Vote, Activity } from "lucide-react"

export function EnsHeader() {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 w-full min-w-0">
      {/* Left side - Logo and text */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 min-w-0 flex-1">
        {/* Logo */}
        <div className="relative shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-200/50 to-gray-300/30 blur-xl" />
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl shadow-lg sm:h-32 sm:w-32 sm:rounded-3xl">
            <img
                    src="/icon.svg"
              alt="DAO Logo"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Text content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 text-2xl font-semibold text-[#007C23] sm:text-2xl">ENS DAO</div>
          <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl">Governance Docs</h1>
          <p className="text-base text-gray-500 sm:text-base">
            Learn about ENS DAO and how to participate in its governance.
          </p>
        </div>
      </div>

      {/* Right side - Action buttons */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 shrink-0 max-w-full justify-end sm:justify-start">
        <Link
          href="https://enswallets.xyz"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50 sm:h-11 sm:w-11"
          aria-label="ENS Wallets"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Wallet className="h-4 w-4 text-gray-700" />
        </Link>
        <Link
          href="https://www.tally.xyz/gov/ens"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50 sm:h-11 sm:w-11"
          aria-label="Vote on Tally"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Vote className="h-4 w-4 text-gray-700" />
        </Link>
        <Link
          href="https://votingpower.xyz"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50 sm:h-11 sm:w-11"
          aria-label="Voting Power"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Activity className="h-4 w-4 text-gray-700" />
        </Link>
        <Link
          href="https://x.com/ens_dao"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50 sm:h-11 sm:w-11"
          aria-label="Follow on X"
        >
          <svg className="h-4 w-4 text-gray-700" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </Link>
        <Link
          href="https://discuss.ens.domains"
          className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 text-sm transition-colors hover:bg-gray-50 sm:h-11 sm:px-4"
        >
          <MessageCircle className="h-4 w-4 shrink-0 text-[#5298D6]" />
          <span className="hidden font-medium text-[#5298D6] sm:inline">Forum</span>
        </Link>
      </div>
    </div>
  )
}
