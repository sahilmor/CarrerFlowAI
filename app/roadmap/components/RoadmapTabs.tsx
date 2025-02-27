import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import IntermediateMap from "./IntermediateMap"
import AdvancedMap from "./AdvancedMap"
import BeginnerMap from "./BeginnerMap"

export function TabsDemo() {
  return (
    <Tabs defaultValue="beginner" className="mt-20">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="beginner">Beginner</TabsTrigger>
        <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
        <TabsTrigger value="advanced">Advanced</TabsTrigger>
      </TabsList>
      <TabsContent value="beginner">
        <BeginnerMap />
      </TabsContent>
      <TabsContent value="intermediate">
        <IntermediateMap />
      </TabsContent>
      <TabsContent value="advanced">
        <AdvancedMap />
      </TabsContent>
    </Tabs>
  )
}
