import {
  BarChart,
  CheckSquare,
  Cog,
  Home,
  LifeBuoy,
  Menu,
  Search,
  SquareStack,
  User,
} from 'lucide-react'
import { Logo } from './Logo'
import { NavItem } from './NavItem'
import { UsedSpaceWidget } from './UsedSpaceWidget'
import { Profile } from './Profile'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as Input from '../Form/Input'
import { Button } from '../Button'

export function Sidebar() {
  return (
    <Collapsible.Root className="scrollbar-thin scrollbar-track-zinc-100 scrollbar-thumb-zinc-300 fixed left-0 right-0 top-0 z-20 flex flex-col gap-6 overflow-hidden border-b border-zinc-200 bg-white p-4 data-[state=open]:bottom-0  lg:bottom-0 lg:right-auto lg:h-auto lg:w-80 lg:overflow-auto lg:border-b-0 lg:border-r lg:px-5 lg:py-8">
      <div className="flex items-center justify-between">
        <Logo />
        <Collapsible.Trigger asChild className="lg:hidden">
          <Button variant="ghost">
            <Menu className="h-6 w-6 text-zinc-500" />
          </Button>
        </Collapsible.Trigger>
      </div>
      <Collapsible.Content
        forceMount
        className="flex flex-1 flex-col gap-6 data-[state=closed]:hidden lg:data-[state=closed]:flex"
      >
        <Input.Root className="mx-1 w-auto">
          <Input.Prefix>
            <Search className="h-5 w-5 text-zinc-500" />
          </Input.Prefix>
          <Input.Control type="text" placeholder="Search" />
        </Input.Root>

        <nav className="space-y-0.5">
          <NavItem title="Home" icon={Home} to="/" />
          <NavItem title="Dashboard" icon={BarChart} to="/" />
          <NavItem title="Produtor" icon={User} to="/add-producer" />
          <NavItem title="Produtores" icon={SquareStack} to="/producer" />
          <NavItem title="Reporting" icon={CheckSquare} to="/" />
        </nav>

        <div className="mt-auto flex flex-col gap-6">
          <nav className="space-y-0.5">
            <NavItem title="Support" icon={LifeBuoy} to="/" />
            <NavItem title="Settings" icon={Cog} to="/" />
          </nav>
          <UsedSpaceWidget />
          <div className="h-px bg-zinc-200"></div>
          <Profile />
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
