import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { teamSchema } from './schemas'

const { fieldContext, formContext } = createFormHookContexts()

// Allow us to bind components to the form to keep type safety but reduce production boilerplate
// Define this once to have a generator of consistent form instances throughout your app
const { useAppForm } = createFormHook({
  fieldComponents: {
    FormField,
  },
  formComponents: {
    Button,
  },
  fieldContext,
  formContext,
})

export const TeamForm = () => {
  const form = useAppForm({
    defaultValues: {
      name: '',
      season: '',
      active: false,
    },
    validators: {
      onChange: teamSchema,
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2))
    },
  })

  return (
    <Form>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
        className="space-y-4"
      >
        {/* Name Field */}
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter team name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Season Field */}
        <FormField
          name="season"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Season</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter season" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
