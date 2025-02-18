"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export function FeedbackForm() {
  const [feedback, setFeedback] = useState("")
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement API call to submit feedback
    console.log("Feedback submitted:", feedback)
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback!",
    })
    setFeedback("")
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Textarea
        placeholder="We'd love to hear your thoughts on our service..."
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
        className="min-h-[150px] p-4 text-lg border-2 border-green-300 dark:border-green-700 focus:border-green-500 dark:focus:border-green-500 rounded-lg transition-all duration-300"
      />
      <Button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white text-lg py-6 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        Submit Feedback
      </Button>
    </motion.form>
  )
}

