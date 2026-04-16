'use client';

import * as React from 'react';
import { ApprovalRecord } from '@/types';
import { Check, X, Clock, MessageCircle } from 'lucide-react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

/**
 * Approval Timeline Component
 *
 * Displays workflow approval history in a timeline format
 *
 * Features:
 * - Show approval/rejection status
 * - Display comments
 * - Timeline visualization
 *
 * Usage:
 * <ApprovalTimeline records={approvalHistory} />
 */

interface ApprovalTimelineProps {
  records: ApprovalRecord[];
  isLoading?: boolean;
}

export const ApprovalTimeline: React.FC<ApprovalTimelineProps> = ({
  records,
  isLoading = false,
}) => {
  if (isLoading) {
    return <div className="text-center py-8 text-gray-500">Loading...</div>;
  }

  if (!records || records.length === 0) {
    return <div className="text-center py-8 text-gray-500">No approvals yet.</div>;
  }

  return (
    <div className="space-y-4">
      {records.map((record, index) => (
        <div key={record.id} className="flex gap-4">
          {/* Timeline dot and line */}
          <div className="flex flex-col items-center">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                record.action === 'approved'
                  ? 'bg-green-500'
                  : record.action === 'rejected'
                    ? 'bg-red-500'
                    : 'bg-blue-500'
              }`}
            >
              {record.action === 'approved' && <Check className="h-5 w-5" />}
              {record.action === 'rejected' && <X className="h-5 w-5" />}
              {record.action === 'commented' && <MessageCircle className="h-5 w-5" />}
            </div>
            {index < records.length - 1 && (
              <div className="w-1 h-12 bg-gray-300 mt-2 dark:bg-gray-600"></div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 pb-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {record.approverName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {record.action === 'approved' && 'Approved'}
                  {record.action === 'rejected' && 'Rejected'}
                  {record.action === 'commented' && 'Commented'}
                </p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {dayjs(record.timestamp).fromNow()}
              </p>
            </div>
            {record.comment && (
              <p className="mt-2 text-sm text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-900 p-2 rounded">
                {record.comment}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
