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
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)
  const loadingStartTimeRef = useRef<number>(0)
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)

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

  // Load selected dataset data with performance optimizations
  useEffect(() => {
    const loadDatasetData = async () => {
      if (!datasetUrls[selectedDataset]) return

      setLoading(true)
      setDataLoaded(false)
      setVideoLoaded(false)
      setLoadingProgress(0)
      loadingStartTimeRef.current = Date.now()
      
      // Estimated times based on file sizes (in seconds)
      const estimatedDataTime = 3
      const estimatedVideoTime = 8
      setEstimatedTime(estimatedDataTime + estimatedVideoTime)
      
      try {
        // Clear any existing interval
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
        }
        
        // Simulate progress for data loading
        progressIntervalRef.current = setInterval(() => {
          const elapsed = (Date.now() - loadingStartTimeRef.current) / 1000
          const progress = Math.min((elapsed / estimatedDataTime) * 50, 50)
          setLoadingProgress(progress)
        }, 100)
        
        // Load JSON and video in parallel
        const [jsonResponse] = await Promise.allSettled([
          fetch(`/api/dataset/${selectedDataset}`)
        ])

        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current)
          progressIntervalRef.current = null
        }
        setLoadingProgress(50)

        if (jsonResponse.status === 'fulfilled') {
          const data = await jsonResponse.value.json()
          setCurrentData(data)
          setDataLoaded(true)
          setLoadingProgress(60)
        } else {
          console.error('Failed to load dataset data:', jsonResponse.reason)
        }

        // Set video URL separately to allow lazy loading
        setVideoUrl(datasetUrls[selectedDataset]['input.webm'])
        setLoadingProgress(70)
        
      } catch (error) {
        console.error('Failed to load dataset data:', error)
      } finally {
        setLoading(false)
        setLoadingProgress(100)
      }
    }

    loadDatasetData()
    
    // Cleanup function
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current)
        progressIntervalRef.current = null
      }
    }
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
      <div className="w-64 bg-white shadow-lg flex flex-col">
        <div className="p-4 border-b flex-shrink-0">
          <h2 className="text-lg font-semibold text-gray-800">GUI Datasets</h2>
          <p className="text-sm text-gray-600">{datasetKeys.length} datasets available</p>
        </div>
        
        <div className="flex-1 min-h-0 custom-scrollbar" style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 120px)' }}>
          <div className="p-2">
            {datasetKeys.map((key) => (
              <button
                key={key}
                onClick={() => setSelectedDataset(key)}
                disabled={loading}
                className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-all duration-200 relative ${
                  selectedDataset === key
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'hover:bg-gray-100 text-gray-700'
                } ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <span>{key}</span>
                  {loading && selectedDataset === key && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 flex flex-col">
        {loading ? (
          <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
            <div className="max-w-md w-full mx-auto p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-4">
                  <svg className="w-8 h-8 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Loading Dataset {selectedDataset}</h3>
                <p className="text-gray-600">Fetching data and preparing video content...</p>
              </div>
              
              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Progress</span>
                  <span>{Math.round(loadingProgress)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 ease-out relative"
                    style={{ width: `${loadingProgress}%` }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                  </div>
                </div>
              </div>
              
              {/* Status and Time */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${dataLoaded ? 'bg-green-500' : 'bg-orange-500 animate-pulse'}`}></div>
                    <span className={dataLoaded ? 'text-green-700' : 'text-orange-700'}>
                      {dataLoaded ? 'Data loaded' : 'Loading data...'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${videoLoaded ? 'bg-green-500' : 'bg-blue-500 animate-pulse'}`}></div>
                    <span className={videoLoaded ? 'text-green-700' : 'text-blue-700'}>
                      {videoLoaded ? 'Video ready' : 'Preparing video...'}
                    </span>
                  </div>
                </div>
                
                {estimatedTime > 0 && !dataLoaded && (
                  <div className="text-center text-sm text-gray-500 bg-white/60 rounded-lg py-2 px-4">
                    <span>Estimated time: ~{estimatedTime} seconds</span>
                  </div>
                )}
                
                <div className="text-center text-xs text-gray-400">
                  <p>Large files may take longer on slower connections</p>
                </div>
              </div>
            </div>
          </div>
        ) : currentData ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Fixed Header */}
            <div className="p-6 pb-0 flex-shrink-0">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Dataset: {selectedDataset}</h1>
              <div className="h-px bg-gradient-to-r from-blue-200 to-transparent mb-6"></div>
            </div>

            {/* Main Content with fixed video */}
            <div className="flex gap-8 flex-1 overflow-hidden px-6 pb-6">
              {/* Center Column: Fixed Video + Scrollable Content */}
              <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                {/* Fixed Video Player */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-shrink-0">
                  <div className="flex items-center p-6 pb-4">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <h3 className="text-lg font-semibold text-gray-800">Screen Recording</h3>
                  </div>
                  {videoUrl && (
                    <>
                      <div className="px-6 flex justify-center">
                        <div className="relative bg-black overflow-hidden shadow-lg" style={{ aspectRatio: '16/9', maxHeight: '500px', maxWidth: '100%' }}>
                          {!videoLoaded && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                              <div className="text-center text-white">
                                <div className="animate-spin rounded-full h-12 w-12 border-2 border-white border-t-transparent mx-auto mb-4"></div>
                                <p className="text-sm">Loading video...</p>
                              </div>
                            </div>
                          )}
                          <video
                            ref={videoRef}
                            src={videoUrl}
                            className="w-full h-full object-contain"
                            controls
                            preload="metadata"
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onLoadedData={() => {
                              setVideoLoaded(true)
                              setLoadingProgress(90)
                            }}
                            onWaiting={() => setVideoLoaded(false)}
                            onCanPlay={() => {
                              setVideoLoaded(true)
                              setLoadingProgress(100)
                            }}
                            onProgress={(e) => {
                              const video = e.currentTarget
                              if (video.buffered.length > 0) {
                                const bufferedEnd = video.buffered.end(video.buffered.length - 1)
                                const duration = video.duration
                                if (duration > 0) {
                                  const bufferProgress = (bufferedEnd / duration) * 30 // 30% of total progress for buffering
                                  setLoadingProgress(prev => Math.max(prev, 70 + bufferProgress))
                                }
                              }
                            }}
                          >
                            Your browser does not support video playback.
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

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="bg-gray-50 px-3 py-1 rounded-full">
                            Click action steps to jump to timestamp
                          </div>
                          {!dataLoaded && (
                            <div className="flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full">
                              <div className="animate-spin rounded-full h-3 w-3 border border-orange-600 border-t-transparent"></div>
                              <span className="text-xs">Loading data...</span>
                            </div>
                          )}
                          {dataLoaded && !videoLoaded && (
                            <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                              <div className="animate-spin rounded-full h-3 w-3 border border-blue-600 border-t-transparent"></div>
                              <span className="text-xs">Loading video...</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                {/* Scrollable Bottom Content */}
                <div className="flex-1 flex flex-col gap-6 overflow-y-auto min-h-0">
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

              {/* Right Column: Actions Timeline - Independent Scroll */}
              <div className="w-80 flex flex-col min-h-0">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 flex-1 flex flex-col min-h-0">
                  <div className="p-6 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center">
                      <span className="w-2 h-2 bg-orange-500 rounded-full mr-3"></span>
                      <h3 className="text-lg font-semibold text-gray-800">Actions Timeline</h3>
                    </div>
                  </div>
                  
                  <div 
                    className="flex-1 min-h-0 custom-scrollbar" 
                    style={{ 
                      overflowY: 'auto',
                      maxHeight: 'calc(100vh - 200px)' 
                    }}
                  >
                    <div className="p-4 space-y-3">
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