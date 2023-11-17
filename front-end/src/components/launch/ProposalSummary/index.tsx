"use client";

import { useState } from "react";
import Button from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import ConvertModal from "../ConvertModal";

const ProposalSummary = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-center">
        <div className="text-sm mt-8  py-8 px-8 max-w-lg rounded-md border mb-6 ">
          <div className="text-lg font-medium mb-4">
            Lorem ipsum dolor sit amet
          </div>
          <div className="mb-2">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem.
          </div>
          <div>
            ✅ <strong>55%</strong> of voters love your proposal
          </div>
          <div className="flex justify-center mt-5">
            <Button
              className="flex justify-center"
              variant="primary"
              size="md"
              type="button"
              onClick={() => {
                setOpen(true);
              }}
            >
              Launch
            </Button>
          </div>
        </div>
        {/* -----------------  */}
        <Modal
          open={open}
          width={600}
          onCancel={() => setOpen(false)}
          closable={true}
          centered
        >
          <ConvertModal />
        </Modal>
      </div>
    </>
  );
};

export default ProposalSummary;
