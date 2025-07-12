import { Accordion, AccordionItem, Button } from '@heroui/react';
import { Calendar, Edit, ExternalLink, Plus, Settings } from 'lucide-react';
import { memo } from 'react';

const QuickTools: React.FC = () => {
  return (
    <Accordion variant="splitted">
      <AccordionItem
        key="1"
        aria-label="Quick Tools"
        title="Quick Tools"
        startContent={<Settings className="w-5 h-5" />}
        className="bg-white/80 dark:bg-gray-800/50"
      >
        <div className="space-y-2">
          <Button
            variant="flat"
            className="w-full justify-start"
            startContent={<Edit className="w-4 h-4" />}
            size="sm"
          >
            Edit portfolio
          </Button>
          <Button
            variant="flat"
            className="w-full justify-start"
            startContent={<Plus className="w-4 h-4" />}
            size="sm"
          >
            Add portfolio item
          </Button>
          <Button
            variant="flat"
            className="w-full justify-start"
            startContent={<ExternalLink className="w-4 h-4" />}
            size="sm"
          >
            Preview my page
          </Button>
          <Button
            variant="flat"
            className="w-full justify-start"
            startContent={<Calendar className="w-4 h-4" />}
            size="sm"
          >
            Update schedule
          </Button>
        </div>
      </AccordionItem>
    </Accordion>
  );
};

export default memo(QuickTools);
