import { pipeline } from "@xenova/transformers";

export async function generateAnswer(messages) {
	const task = "text-generation";
	const model = "Xenova/TinyLlama-1.1B-Chat-v1.0";

	const generator = await pipeline(task, model);

	const prompt = generator.tokenizer.apply_chat_template(messages, {
		tokenize: false,
		add_generation_prompt: true,
	});

	const answer = await generator(prompt, {
		max_new_tokens: 256,
		temperature: 0.7,
		do_sample: true,
		top_k: 50,
	});

	//console.log("Answer: ", answer);
	return answer;
}

const messages = [
	{ role: "system", content: "You are a friendly assistant." },
	{
		role: "user",
		content: "How should a cover letter look like?",
	},
	{
		role: "assistant",
		content: `'A cover letter should be written in a professional tone and format. Here are some tips for writing a cover letter:\n' +'\n' +"1. Begin with a strong opening sentence that grabs the reader's attention and shows your enthusiasm for the job.\n" +'\n' +'2. Highlight your relevant experience, skills, and qualifications that match the job description.\n' +'\n' +'3. Use action-oriented language to showcase your accomplishments or potential success in the job.\n' +'\n' +'4. Use a clear and concise sentence structure and avoid wordy sentences with long paragraphs.\n' +'\n' +'5. Include a call to action that asks the employer to forward the letter to their hiring manager.\n' +'\n' +'6. Proofread your cover letter carefully for typos and grammar errors.\n' +'\n' +'7. Use a professional headshot, a clear email address, and a contact phone number, if available.\n' +'\n' +'8. Add a personal touch by including a brief note or message about why you are interested in the job and why this particular employer is a good fit for your career goals.\n' +'\n' +'9. Send your cover letter as an attachment to the email to the hiring manager.\n' +'\n' +'10. Make sure the email address in the cover letter matches'}`,
	},
	{
		role: "user",
		content: `Write a cover letter with this context: My name is Ivona Josipovic. I am a hard-working and dynamic developer with four years of experience as a group manager and coordinator. Regular tinkering with my ten-year-old blog was the starting point for what became a total embrace of Frontend development and Javascript in particular. An open-source contributor in my spare time.`,
	},
];
