import React from "react";
import { GitBranch, Clock, MapPin } from "lucide-react";

const PatientTracing = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Patient & Contact Tracing
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Visualize patient contacts and movement patterns for infection
            control
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by Patient ID, Name, or Room Number..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-primary">Search</button>
            <button className="btn btn-secondary">Advanced Filters</button>
          </div>
        </div>
      </div>

      {/* Interactive Network Graph Placeholder */}
      <div className="card">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Contact Network Graph
        </h3>
        <div className="bg-gray-50 rounded-lg p-8 text-center h-96 flex items-center justify-center">
          <div className="text-gray-500">
            <GitBranch className="h-16 w-16 mx-auto mb-4" />
            <p className="text-lg font-medium">Interactive Contact Network</p>
            <p className="text-sm">
              Select a patient to view their contact network and movement
              history
            </p>
          </div>
        </div>
      </div>

      {/* Timeline and Patient Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timeline */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Movement Timeline
          </h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  14:30 - Present
                </p>
                <p className="text-sm text-gray-600">Ward A, Room 205</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  09:15 - 14:30
                </p>
                <p className="text-sm text-gray-600">ICU, Room 12</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-gray-500" />
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  08:00 - 09:15
                </p>
                <p className="text-sm text-gray-600">Emergency Room</p>
              </div>
            </div>
          </div>
        </div>

        {/* Patient Details */}
        <div className="card">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Patient Profile
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Patient ID
              </label>
              <p className="mt-1 text-sm text-gray-900">P-2031</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                MDR Status
              </label>
              <span className="mt-1 badge badge-danger">Positive - MRSA</span>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Admission Date
              </label>
              <p className="mt-1 text-sm text-gray-900">March 15, 2024</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Current Location
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-900">Ward A, Room 205</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientTracing;