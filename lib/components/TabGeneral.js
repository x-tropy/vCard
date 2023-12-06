'use client';
import { updateProfile } from 'lib/db';
import { useFormState } from 'react-dom';
import { Submit } from 'lib/components/MiscClient';
import { Feedback } from 'lib/components/Misc';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { cn } from 'lib/utils';
import { Button } from 'lib/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'lib/components/ui/form';
import { Input } from 'lib/components/ui/input';
import { useState } from 'react';

const generalFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Name must be at least 2 characters.',
    })
    .max(30, {
      message: 'Name must not be longer than 20 characters.',
    }),
  user_id: z
    .string()
    .min(5, {
      message: 'User ID must be at least 5 characters.',
    })
    .max(20, {
      message: 'User ID must not be longer than 20 characters.',
    })
    .regex(/^[a-z0-9_-]+$/i, {
      message: 'Name must only contain alphanumeric characters, dashes, and underscores.',
    }),
});

export default function TabGeneral({ data }) {
  const form = useForm({
    resolver: zodResolver(generalFormSchema),
    defaultValues: data,
  });

  const [serverResponse, setServerResponse] = useState(null);
  const [userId, setUserId] = useState(data.user_id);

  async function onSubmit(formData) {
    console.log('\n>>>>>>>>\n', 'formData', '\n', { ...formData, id: data.id }, '\n<<<<<<<<\n');
    setUserId(formData.user_id);
    const response = await updateProfile({ ...formData, id: data.id });
    setServerResponse(response);
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        {/* _____name_____ */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>This is the name that will be displayed on your profile and in emails.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* _____user_id_____ */}
        <FormField
          control={form.control}
          name="user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User ID</FormLabel>
              <FormControl>
                <Input placeholder="Your id" {...field} />
              </FormControl>
              <FormDescription>
                Your ID is used by others to find and mention you. Please be aware you can only change it twice within a
                12-month period.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <Submit /> */}
        <Button type="submit">Update settings</Button>
        {serverResponse && <Feedback {...serverResponse} url={userId} />}
      </form>
    </Form>
  );
}
