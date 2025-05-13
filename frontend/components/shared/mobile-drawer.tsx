'use client';

import { Menu } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import UploadSidebar from './upload-sidebar';

export function MobileDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="block md:hidden rounded-full cursor-pointer w-10 h-10 absolute top-23 left-5" variant="outline">
          <Menu className="w-6 h-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <UploadSidebar className="!block" />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
