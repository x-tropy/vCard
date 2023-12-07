'use client';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'lib/components/ui/form';
import { updateProfile } from 'lib/db';
import { Feedback } from 'lib/components/Misc';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { cn } from 'lib/utils';
import { Button } from 'lib/components/ui/button';
import { Textarea } from 'lib/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from 'lib/components/ui/popover';
import { RadioGroup, RadioGroupItem } from 'lib/components/ui/radio-group';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'lib/components/ui/command';
import { Calendar } from 'lib/components/ui/calendar';
import { Input } from 'lib/components/ui/input';
import { CalendarDays, ChevronsUpDown, Check, Send } from 'lucide-react';
import { useState } from 'react';
import { runes } from 'runes2';
import { formattedDate, capitalize } from 'lib/utils';

// Validation schema
const generalFormSchema = z.object({
  name: z
    .string()
    // Use runes to count accurately (support: unicodes, emojis)
    .refine((name) => runes(name).length >= 2, {
      message: 'Name must be at least 2 characters.',
    })
    .refine((name) => runes(name).length <= 20, {
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
  bio: z
    .string()
    .refine((bio) => runes(bio).length <= 160, {
      message: 'Bio must not be longer than 160 characters.',
    })
    .optional(),
  birth_date: z.string().optional(),
  location_country: z.string().optional(),
  working_status: z.string().optional(),
  linkedin_user_id: z.string().regex(/^[a-z0-9_-]*$/i, {
    message: 'LinkedIn ID must only contain alphanumeric characters, dashes, and underscores.',
  }),
  github_user_id: z.string().regex(/^[a-z0-9_-]*$/i, {
    message: 'GitHub ID must only contain alphanumeric characters, dashes, and underscores.',
  }),
  twitter_user_id: z.string().regex(/^[a-z0-9_-]*$/i, {
    message: 'Twitter ID must only contain alphanumeric characters, dashes, and underscores.',
  }),
  instagram_user_id: z.string().regex(/^[a-z0-9_-]*$/i, {
    message: 'Instagram ID must only contain alphanumeric characters, dashes, and underscores.',
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
    console.log('\n>>>>>>>>\n', 'TabGeneral.js:POST:Profile', '\n', formData, '\n<<<<<<<<\n');
    const response = await updateProfile({ ...formData, id: data.id });

    // Update user_id (used by Feedback component)
    setUserId(formData.user_id);
    setServerResponse(response);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* _____ name _____ */}
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
        {/* _____ user_id _____ */}
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
        {/* _____ bio _____ */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="About me" {...field} />
              </FormControl>
              <FormDescription>Write a short bio about yourself.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* _____ birth_date _____ */}
        <FormField
          control={form.control}
          name="birth_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Birthday</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}>
                      {field.value ? field.value : <span>Pick a date</span>}
                      <CalendarDays className="ml-auto h-5 w-5 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => field.onChange(formattedDate(date))}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* _____ location_country _____ */}
        <FormField
          control={form.control}
          name="location_country"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Country</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline" role="combobox" className="w-[240px] justify-between capitalize">
                      {field.value ? field.value : <span>Your current location</span>}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[240px] h-[300px] p-0">
                  <Command>
                    <CommandInput placeholder="Search country..." className="h-9" />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup className="overflow-scroll">
                      {data.meta.countries.map((country) => (
                        <CommandItem
                          key={country.name}
                          value={country.name}
                          onSelect={(value) => field.onChange(capitalize(value))}>
                          {country.name}
                          <Check
                            className={cn(
                              'ml-auto h-4 w-4',
                              capitalize(field.value) === country.name ? 'opacity-100' : 'opacity-0'
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>This is the country that will be displayed on your profile.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* _____ working_status _____ */}
        <FormField
          control={form.control}
          name="working_status"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Working status</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className={`flex flex-col space-y-1`}>
                  {data.meta.working_status.map((status, index) => (
                    <FormItem key={index} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={status} />
                      </FormControl>
                      <FormLabel className="font-normal">{status}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* _____ URLs _____ */}
        <FormField
          control={form.control}
          name="linkedin_user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>LinkedIn</FormLabel>
              <FormControl>
                <Input placeholder="Your LinkedIn ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="github_user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GitHub</FormLabel>
              <FormControl>
                <Input placeholder="Your GitHub ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="twitter_user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Twitter</FormLabel>
              <FormControl>
                <Input placeholder="Your Twitter ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="instagram_user_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Instagram</FormLabel>
              <FormControl>
                <Input placeholder="Your Instagram ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* _____ phone _____ */}
        {/* _____ country_calling_code _____ */}
        {/* _____ phone_is_public _____ */}
        {/* _____ email _____ */}
        {/* _____ email_is_public _____ */}
        {serverResponse && <Feedback {...serverResponse} url={userId} />}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          <Send className="mr-2 h-4 w-4" />
          Save changes
        </Button>
      </form>
    </Form>
  );
}
