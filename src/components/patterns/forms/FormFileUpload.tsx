'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Upload, X } from 'lucide-react'

/**
 * FormFileUpload Pattern Component
 * Drag and drop file upload using primitives
 */

interface FormFileUploadProps {
  accept?: string
  multiple?: boolean
  maxSize?: number
  maxFiles?: number
  onFilesSelected: (files: File[]) => void
  error?: string
  disabled?: boolean
}

const FormFileUpload = React.forwardRef<
  HTMLDivElement,
  FormFileUploadProps
>(
  (
    {
      accept = '.png,.jpg,.jpeg,.pdf',
      multiple = true,
      maxSize = 10 * 1024 * 1024,
      maxFiles,
      onFilesSelected,
      error,
      disabled,
    },
    ref
  ) => {
    const [isDragActive, setIsDragActive] = React.useState(false)
    const [files, setFiles] = React.useState<File[]>([])
    const inputRef = React.useRef<HTMLInputElement>(null)

    const validateFiles = (filesToValidate: FileList) => {
      const validatedFiles: File[] = []

      Array.from(filesToValidate).forEach((file) => {
        if (maxSize && file.size > maxSize) {
          console.warn(
            `File ${file.name} exceeds max size of ${maxSize / 1024 / 1024}MB`
          )
          return
        }
        validatedFiles.push(file)
      })

      if (maxFiles && validatedFiles.length > maxFiles) {
        console.warn(`Only ${maxFiles} files allowed`)
        validatedFiles.splice(maxFiles)
      }

      return validatedFiles
    }

    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(e.type === 'dragenter' || e.type === 'dragover')
    }

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragActive(false)

      if (disabled) return

      const droppedFiles = validateFiles(e.dataTransfer.files)
      const allFiles = multiple ? [...files, ...droppedFiles] : droppedFiles
      setFiles(allFiles)
      onFilesSelected(allFiles)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = validateFiles(e.target.files)
        const allFiles = multiple ? [...files, ...selectedFiles] : selectedFiles
        setFiles(allFiles)
        onFilesSelected(allFiles)
      }
    }

    const removeFile = (index: number) => {
      const updatedFiles = files.filter((_, i) => i !== index)
      setFiles(updatedFiles)
      onFilesSelected(updatedFiles)
    }

    const acceptList = accept.split(',').map((ext) => ext.trim())

    return (
      <div ref={ref} className="space-y-3">
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer',
            isDragActive
              ? 'border-blue-500 bg-blue-500/5'
              : 'border-slate-300 hover:border-slate-400 dark:border-slate-700 dark:hover:border-slate-600',
            error && 'border-red-500 bg-red-500/5',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => !disabled && inputRef.current?.click()}
        >
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            disabled={disabled}
            onChange={handleInputChange}
            className="hidden"
            aria-label="Upload files"
          />

          <Upload className="mx-auto h-8 w-8 mb-2 text-slate-400 dark:text-slate-500" />
          <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
            Click or drag files here
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Supported formats: {acceptList.join(', ')}
            {maxSize && ` (max ${maxSize / 1024 / 1024}MB per file)`}
          </p>
        </div>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-medium">{error}</p>
        )}

        {files.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-slate-600 dark:text-slate-400">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </p>
            <div className="space-y-2">
              {files.map((file, idx) => (
                <div
                  key={`${file.name}-${idx}`}
                  className="flex items-center justify-between p-2 rounded border border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate text-slate-900 dark:text-slate-100">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)}MB
                    </p>
                  </div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="ml-2 p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                    aria-label={`Remove ${file.name}`}
                  >
                    <X className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }
)

FormFileUpload.displayName = 'FormFileUpload'

export { FormFileUpload }
export type { FormFileUploadProps }
