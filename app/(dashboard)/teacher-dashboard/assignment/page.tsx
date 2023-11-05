import React from 'react'
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import AssignmentForm from '../_components/AssignmentForm';
const Assignment = () => {
  return (
      <section>
          <div className='flex items-center justify-between'>
              <h1 className='font-bold text-3xl'>Assignments</h1>
              <Dialog>
                  <DialogTrigger asChild>
                      <Button size="lg" variant="outline">Add</Button>
                  </DialogTrigger>
                  <DialogContent>
                      <AssignmentForm />
                  </DialogContent>
              </Dialog>
          </div>
    </section>
  )
}

export default Assignment