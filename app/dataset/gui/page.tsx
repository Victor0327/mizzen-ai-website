'use client'

import { useState, useEffect, useRef } from 'react'
import { Play, Pause, ExternalLink } from 'lucide-react'

interface InnerAction {
  type: string
  url: string
  info: Record<string, unknown>
  time: number
  _delete: boolean
}

interface Action {
  innerActions: InnerAction[]
}

interface DatasetData {
  instruct: string
  result: string[]
  actions: Action[]
}

interface DatasetUrls {
  [key: string]: {
    'data.json': string
    'input.webm': string
  }
}

export default function DatasetGUIPage() {
  const [selectedDataset, setSelectedDataset] = useState<string>('data_1')
  const [datasetUrls, setDatasetUrls] = useState<DatasetUrls>({})
  const [currentData, setCurrentData] = useState<DatasetData | null>(null)
  const [loading, setLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState(false)
  const [playbackRate, setPlaybackRate] = useState(1)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Load dataset URLs on mount
  useEffect(() => {
    const loadDatasetUrls = async () => {
      try {
        const response = await fetch('/datasets_gui_gt_5min/tos_urls.json')
        const urls = await response.json()
        setDatasetUrls(urls)
      } catch (error) {
        console.error('Failed to load dataset URLs:', error)
      }
    }
    loadDatasetUrls()
  }, [])

  // Load selected dataset data
  useEffect(() => {
    const loadDatasetData = async () => {
      if (!datasetUrls[selectedDataset]) return

      setLoading(true)
      try {
        // Use API route to avoid CORS issues
        const jsonResponse = await fetch(`/api/dataset/${selectedDataset}`)
        const data = await jsonResponse.json()
        setCurrentData(data)
        setVideoUrl(datasetUrls[selectedDataset]['input.webm'])
      } catch (error) {
        console.error('Failed to load dataset data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadDatasetData()
  }, [selectedDataset, datasetUrls])

  const handleStepClick = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time / 1000 // Convert ms to seconds
      if (!isPlaying) {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleVideoPlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate
      setPlaybackRate(rate)
    }
  }

  const openUrl = (url: string) => {
    window.open(url, '_blank')
  }

  const datasetKeys = Object.keys(datasetUrls).sort((a, b) => {
    const numA = parseInt(a.replace('data_', ''))
    const numB = parseInt(b.replace('data_', ''))
    return numA - numB
  })

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">GUI Datasets</h2>
          <p className="text-sm text-gray-600">{datasetKeys.length} datasets available</p>
        </div>
        
        <div className="p-2">
          {datasetKeys.map((key) => (
            <button
              key={key}
              onClick={() => setSelectedDataset(key)}
              className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                selectedDataset === key
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'hover:bg-gray-100 text-gray-700'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Loading dataset...</div>
          </div>
        ) : currentData ? (
          <div className="flex-1 flex flex-col p-6 overflow-hidden">
            {/* Header */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dataset: {selectedDataset}</h1>
              <div className="h-px bg-gradient-to-r from-blue-200 to-transparent"></div>
            </div>

            {/* Main Content */}
            <div className="flex gap-8 flex-1 overflow-hidden">
              {/* Center Column: Video + Instruction + Results */}
              <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                {/* Video Player */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                  <div className="flex items-center p-6 pb-4">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <h3 className="text-lg font-semibold text-gray-800">Screen Recording</h3>
                  </div>
                  {videoUrl && (
                    <>
                      <div className="px-0">
                        <div className="relative bg-black overflow-hidden shadow-lg" style={{ aspectRatio: '16/9', maxHeight: '500px' }}>
                          <video
                            ref={videoRef}
                            src={videoUrl}
                            className="w-full h-full object-contain"
                            controls
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                          >
                            Your browser does not support video playbook.
                          </video>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-6 pt-5">
                        <div className="flex items-center gap-4">
                          <button
                            onClick={handleVideoPlayPause}
                            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-sm"
                          >
                            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                            {isPlaying ? 'Pause' : 'Play'}
                          </button>
                          
                          {/* Playback Speed Control */}
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600 font-medium">Speed:</span>
                            <div className="flex items-center bg-gray-100 rounded-lg p-1">
                              {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                                <button
                                  key={speed}
                                  onClick={() => handlePlaybackRateChange(speed)}
                                  className={`px-3 py-1 text-sm rounded-md transition-all duration-200 ${
                                    playbackRate === speed
                                      ? 'bg-blue-600 text-white shadow-sm'
                                      : 'text-gray-700 hover:bg-gray-200'
                                  }`}
                                >
                                  {speed}x
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-sm text-gray-600 bg-gray-50 px-3 py-1 rounded-full">
                          Click action steps to jump to timestamp
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Bottom content with scrollable area */}
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto">
                  {/* Instruction */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-shrink-0">
                    <div className="flex items-center mb-4">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      <h3 className="text-lg font-semibold text-gray-800">Instruction</h3>
                    </div>
                    <div className="prose prose-gray max-w-none">
                      <p className="text-gray-700 leading-relaxed text-base">{currentData.instruct}</p>
                    </div>
                  </div>

                  {/* Results */}
                  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex-shrink-0">
                    <div className="flex items-center mb-4">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                      <h3 className="text-lg font-semibold text-gray-800">Results</h3>
                    </div>
                    <ul className="space-y-3">
                      {currentData.result.map((result, index) => (
                        <li key={index} className="text-gray-700 border-l-4 border-green-200 pl-4 text-sm leading-relaxed hover:bg-gray-50 p-2 rounded-r-lg transition-colors">
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column: Actions Timeline */}
              <div className="w-80 flex flex-col overflow-hidden">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 overflow-hidden">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      <h3 className="text-lg font-semibold text-gray-800">Actions Timeline</h3>
                    </div>
                  </div>
                  
                  <div className="p-4 h-full overflow-y-auto">
                    <div className="space-y-3">
                      {currentData.actions.map((action, actionIndex) => (
                        <div key={actionIndex} className="border border-gray-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                          <h4 className="font-medium text-gray-800 mb-3 text-sm flex items-center">
                            <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 mr-2">
                              {actionIndex + 1}
                            </span>
                            Action {actionIndex + 1}
                          </h4>
                          <div className="space-y-2">
                            {action.innerActions.map((innerAction, innerIndex) => (
                              <div
                                key={innerIndex}
                                className="p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-all duration-200 border border-transparent hover:border-blue-200"
                                onClick={() => handleStepClick(innerAction.time)}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                                    {innerAction.type}
                                  </span>
                                  <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                    {(innerAction.time / 1000).toFixed(1)}s
                                  </span>
                                </div>
                                {innerAction.url && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <span className="text-xs text-gray-600 truncate flex-1 bg-white px-2 py-1 rounded border">
                                      {innerAction.url}
                                    </span>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation()
                                        openUrl(innerAction.url)
                                      }}
                                      className="text-blue-500 hover:text-blue-700 p-1 hover:bg-blue-100 rounded transition-colors"
                                    >
                                      <ExternalLink size={12} />
                                    </button>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-lg text-gray-600">Select a dataset to view details</div>
          </div>
        )}
      </div>
    </div>
  )
}