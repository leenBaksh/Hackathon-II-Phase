// frontend/src/components/devtools/ComponentTree.tsx
'use client';

import { useState, useEffect } from 'react';

interface ComponentInfo {
  name: string;
  type: string;
  props: number;
  children: ComponentInfo[];
}

export default function ComponentTree() {
  const [components, setComponents] = useState<ComponentInfo[]>([]);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  useEffect(() => {
    // This would integrate with React DevTools to get actual component tree
    // For now, showing a mock structure
    const mockComponents: ComponentInfo[] = [
      {
        name: 'App',
        type: 'div',
        props: 3,
        children: [
          {
            name: 'AuthProvider',
            type: 'Provider',
            props: 1,
            children: [
              {
                name: 'Layout',
                type: 'div',
                props: 2,
                children: [
                  {
                    name: 'Header',
                    type: 'header',
                    props: 1,
                    children: []
                  },
                  {
                    name: 'Main',
                    type: 'main',
                    props: 1,
                    children: [
                      {
                        name: 'TasksPage',
                        type: 'div',
                        props: 5,
                        children: [
                          {
                            name: 'TaskList',
                            type: 'div',
                            props: 3,
                            children: []
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ];

    setComponents(mockComponents);
  }, []);

  const toggleExpand = (componentName: string) => {
    const newExpanded = new Set(expanded);
    if (newExpanded.has(componentName)) {
      newExpanded.delete(componentName);
    } else {
      newExpanded.add(componentName);
    }
    setExpanded(newExpanded);
  };

  const renderComponent = (component: ComponentInfo, depth: number = 0) => {
    const isExpanded = expanded.has(component.name);
    const hasChildren = component.children && component.children.length > 0;

    return (
      <div key={component.name} style={{ marginLeft: `${depth * 20}px` }}>
        <div 
          className="flex items-center gap-2 py-1 px-2 rounded hover:bg-slate-700/50 cursor-pointer transition-colors"
          onClick={() => hasChildren && toggleExpand(component.name)}
        >
          {hasChildren && (
            <svg 
              className="w-3 h-3 text-gray-400 transition-transform"
              style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          <span className="text-gray-300 text-xs">{component.name}</span>
          <span className="text-gray-500 text-xs">({component.type})</span>
          <span className="text-blue-400 text-xs">[{component.props}]</span>
        </div>
        
        {isExpanded && hasChildren && (
          <div className="border-l border-slate-700 ml-2">
            {component.children.map(child => renderComponent(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed top-20 right-4 z-50 bg-slate-900/90 backdrop-blur-sm border border-white/10 rounded-lg p-3 max-w-xs max-h-96 overflow-y-auto">
      <div className="text-xs text-gray-400 mb-2">Component Tree</div>
      <div className="space-y-1">
        {components.map(component => renderComponent(component))}
      </div>
    </div>
  );
}