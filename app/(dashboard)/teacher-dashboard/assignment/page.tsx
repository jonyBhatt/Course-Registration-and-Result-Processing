import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import AssignmentForm from "../_components/create-assignment";
import Assignments from '../_components/show-assignments';
const Assignment = () => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-3xl">Assignments</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="outline">
              Add
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add your Assignments</DialogTitle>
            </DialogHeader>
            <AssignmentForm />
          </DialogContent>
        </Dialog>

      </div>
      <div className='py-10'>
        <Assignments />
      </div>
    </section>
  );
}

export default Assignment