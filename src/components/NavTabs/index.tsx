import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import * as Tabs from '@radix-ui/react-tabs'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import TabItem from './TabItem'

interface PathToTabMap {
  [path: string]: string
}

export function NavTabs() {
  const navigate = useNavigate()
  const location = useLocation()
  const [currentTab, setCurrentTab] = useState('tab1')

  useEffect(() => {
    const path = location.pathname
    const pathToTab: PathToTabMap = {
      '/': 'tab1',
      '/add-producer': 'tab2',
      '/producer': 'tab3',
    }

    setCurrentTab(pathToTab[path] || 'tab1')
  }, [location.pathname])

  return (
    <Tabs.Root
      value={currentTab}
      onValueChange={(value) => {
        if (value !== currentTab) {
          setCurrentTab(value)
          const tabToPath: PathToTabMap = {
            tab1: '/',
            tab2: '/add-producer',
            tab3: '/producer',
          }
          navigate(tabToPath[value])
        }
      }}
    >
      <ScrollArea.Root className="w-full" type="scroll">
        <ScrollArea.Viewport className="w-full overflow-x-scroll">
          <Tabs.List className="mt-6 flex w-full items-center gap-4 border-b border-zinc-200">
            <TabItem
              value="tab1"
              title="Dashboard"
              isSelected={currentTab === 'tab1'}
            />
            <TabItem
              value="tab2"
              title="Novo Produtor"
              isSelected={currentTab === 'tab2'}
            />
            <TabItem
              value="tab3"
              title="Produtores"
              isSelected={currentTab === 'tab3'}
            />
            <TabItem
              value="tab4"
              title="Fazenda"
              isSelected={currentTab === 'tab4'}
            />
            <TabItem
              value="tab5"
              title="Culturas Plantadas"
              isSelected={currentTab === 'tab5'}
            />
          </Tabs.List>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex h-0.5 translate-y-1.5 touch-none select-none flex-col bg-zinc-100"
          orientation="horizontal"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-lg bg-zinc-300" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </Tabs.Root>
  )
}
