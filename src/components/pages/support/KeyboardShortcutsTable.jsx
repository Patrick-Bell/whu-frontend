import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Kbd, KbdGroup } from "@/components/ui/kbd"
import { Command, Keyboard } from "lucide-react"
  
  const KeyboardShortcutsTable = () => {
    const shortcuts = [
      { command: "Quick Search", keys: ["cmd", "k"], page: "Any Page", action: "Open quick search dialog" },
      { command: "Account", keys: ["cmd", "r"], page: "Any Page", action: "Navigate to user profile page" },
      { command: "New Worker", keys: ["cmd", "o"], page: "Workers Page", action: "Open add worker modal" },
      { command: "New Game", keys: ["cmd", "o"], page: "Games Page", action: "Open add game modal" },
      { command: "New Cart", keys: ["cmd", "o"], page: "Games Page", action: "Open add cart modal" },
      { command: "Close Modal", keys: ["Esc"], page: "Any Modal", action: "Close the currently open modal" },
      { command: "Toggle sidebar", keys: ["cmd", 'b'], page: "Any Page", action: "Show/Hide sidebar" },
      { command: "Help", keys: ["cmd", 'h'], page: "Any Page", action: "If a tutorial is avaialble on this page, it will play" },


    ]
  
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 mt-4">
        <div className="flex items-center gap-2 mb-4">
          <Keyboard />
          <p className="font-bold text-gray-900">Keyboard Shortcuts</p>
        </div>
  
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Command</TableHead>
              <TableHead>Keyboard Shortcut</TableHead>
              <TableHead>Page</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {shortcuts.map((shortcut, index) => (
              <TableRow key={index}>
                <TableCell>{shortcut.command}</TableCell>
                <TableCell>
                  <KbdGroup>
                    {shortcut.keys.map((key, i) => (
                      <span key={i}>
                        <Kbd>{key === 'cmd' ? <Command /> : ''}{key}</Kbd>
                        {i < shortcut.keys.length - 1 && <span className="mx-1">+</span>}
                      </span>
                    ))}
                  </KbdGroup>
                </TableCell>
                <TableCell>{shortcut.page}</TableCell>
                <TableCell>{shortcut.action}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
  
  export default KeyboardShortcutsTable
  