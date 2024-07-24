import { Search, ArrowLeft } from 'lucide-react';
import { Card, CardHeader } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Outlet, Link, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <div className="container">
          <h1 className="text-center text-3xl font-bold mb-4">FXNotify</h1>
          <Card>
            <CardHeader className="flex-row justify-between">
              <Link
                className={buttonVariants({ variant: 'outline', size: 'icon' })}
                to={isHomePage ? 'search' : '/'}
              >
                {isHomePage ? <Search /> : <ArrowLeft />}
              </Link>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <Outlet />
          </Card>
        </div>
      </div>
    </>
  );
}

export default App;
