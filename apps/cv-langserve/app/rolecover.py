import os

from dotenv import load_dotenv
from langchain_community.vectorstores import FAISS, Pinecone
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableParallel, RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from pinecone import Pinecone as PineconeClient

load_dotenv()

# Keys
PINECONE_API_KEY = os.environ['PINECONE_API_KEY']
PINECONE_ENVIRONMENT = os.environ['PINECONE_ENVIRONMENT']
PINECONE_INDEX_NAME = os.environ['PINECONE_INDEX_NAME']
PINECONE_HOST = os.environ['PINECONE_HOST']

# Init
pinecone = PineconeClient(api_key=PINECONE_API_KEY, environment=PINECONE_ENVIRONMENT)

index = pinecone.Index(name=PINECONE_INDEX_NAME, host=PINECONE_HOST)
embeddings = OpenAIEmbeddings()
vectorstore = Pinecone(index, embeddings, 'text')
retriever = vectorstore.as_retriever()

# Availability
availabilityVectorstore = FAISS.from_texts(
	['Available April 2024'], embedding=OpenAIEmbeddings()
)
availabilityRetriever = availabilityVectorstore.as_retriever()

# Languages
languagesVectorstore = FAISS.from_texts(
	[
		'Figma, HTML, CSS, React, XState, Redux, Tailwind CSS, Shadcn/UI, Headless UI, CSS-in-JS, TypeScript, JavaScript, Storybook, Next.js, Remix, React Router, React Testing Library, Zod, Jest, Cypress, Playwright, Node JS, Express, NPM, GraphQL, REST API, SOAP, Prisma, Drizzle, Postgres, MySQL, MongoDB, AWS, AWS Amplify, AWS Serverless, Lambda, Cognito, Auth.JS, Vercel, Fly.io, Docker, CI/CD, GIT, VSCode, Slack, LangChain, AI SDK, Open AI, Hugging Face, SendBird, XMPP, Open Fire, JWT, React Native, iOS, Android, Expo, Fastlane, Python, .Net'
	],
	embedding=OpenAIEmbeddings(),
)
languagesRetriever = languagesVectorstore.as_retriever()

# RAG prompt
template = """You are an AI designed to write a cover letter for Dave Hudson. Your responses should be in the first person, as if Dave himself is speaking. Use phrases like "In my view..." or "I believe..." or "My experience...".
          Your response should be:
            - based solely on the context provided, which includes Dave's CV and his thoughts on various topics
            - as short as possible whilst covering Dave's experience with the technologies mentioned in the job description
            - emphasise that Dave is a T-Shaped person with deep specialism in React & front-end engineering.
            - cover hard skills such as technologies and soft skills such as communication, collaboration and team work
          If the question contains:
            - any programming languages that are not in {languages} then your response should not mention those languages.
            - Security Clearance then your response should mention that "I have SC clearance but have not worked in the Public Sector in the last 12 months."
            - Hybrid working then your response should mention that the maximum I can commit to on-site working is "2-3 days per month."
            - agile or scrum then mention that Dave is also "a certified Scrum Master"
            Dave's current availability for work is {currentAvailability}
          Context: {context}
          question: {question}
          answer:
"""
prompt = ChatPromptTemplate.from_template(template)

# LLM
model = ChatOpenAI(temperature=0, model='gpt-4-1106-preview')

# LCEL Chain
chain = (
	RunnableParallel(
		{
			'context': retriever,
			'currentAvailability': availabilityRetriever,
			'languages': languagesRetriever,
			'question': RunnablePassthrough(),
		}
	)
	| prompt
	| model
	| StrOutputParser()
)
