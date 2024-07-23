import { Plus } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

function App() {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="container">
          <h1 className="text-center text-3xl font-bold mb-4">FXNotify</h1>
          <Card>
            <CardHeader className="flex-row justify-between">
              <Button variant="outline" size="icon">
                <Plus className="h-6 w-6" />
              </Button>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
