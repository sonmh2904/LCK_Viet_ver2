import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Head from 'next/head'

interface Project {
  id: string
  title: string
  description: string
}

interface ProjectDetailProps {
  project: Project
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter()

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{project?.title || 'Project Detail'} - LCK Việt</title>
        <meta name="description" content={project?.description || 'Project description'} />
      </Head>
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {project?.title || 'Project Title'}
            </h1>
            <p className="text-gray-600 mb-6">
              {project?.description || 'Project description goes here...'}
            </p>
            
            <button
              onClick={() => router.back()}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Quay lại
            </button>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Ensure params exists
  if (!params || !params.id) {
    return {
      notFound: true
    }
  }

  // Mock data - in real app, fetch from API
  const project: Project = {
    id: params.id as string,
    title: `Project ${params.id}`,
    description: `Description for project ${params.id}`
  }

  return {
    props: {
      project
    }
  }
}