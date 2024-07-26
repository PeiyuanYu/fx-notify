import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const conditionSchema = z.enum(['greater than', 'equal to', 'less than']);

const valueSchema = z
  .number()
  .refine((val) => /^\d+(\.\d{1,2})?$/.test(val.toString()), {
    message: 'Value must be a number with up to 2 decimal places',
  });

const emailSchema = z.string().email({ message: 'Invalid email address' });

const schema = z.object({
  condition: conditionSchema,
  value: valueSchema,
  email: emailSchema,
});

function NotifySetting() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      condition: 'equal to',
      value: 0,
      email: 'example@example.com',
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof schema>) {
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <div className="w-full max-w-[500px] mx-auto my-2 p-4">
      <h2 className="text-xl font-bold mb-6">Notification Settings</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex gap-4 justify-between items-start">
            <FormField
              control={form.control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Condition</FormLabel>
                  <FormControl>
                    <Select {...field} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greater than">
                          Greater Than
                        </SelectItem>
                        <SelectItem value="equal to">Equal To</SelectItem>
                        <SelectItem value="less than">Less Than</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select the condition for the notification.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="4.78"
                      {...field}
                      type="number"
                      step="0.01"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormDescription>
                    Set the threshold value for the notification.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="example@example.com" {...field} />
                </FormControl>
                <FormDescription>
                  Please set your email address for the notification.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Set Notification</Button>
        </form>
      </Form>
    </div>
  );
}

export default NotifySetting;
