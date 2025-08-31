export default function EvidencePage() {
  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold text-primary">MRV Evidence</h1>
      <p className="text-gray-700 max-w-2xl">
        The MRV evidence log aligns with ISO 14083/GLEC and IMO CII standards. This page will show summary statistics
        from the Calc_Summary and other relevant sheets of the maritime evidence workbook, along with callouts on MRV
        alignment. Implementation is pending.
      </p>
      <div className="p-4 border rounded-md bg-yellow-50 text-yellow-800">
        <p className="font-medium">Coming soon</p>
        <p>Detailed MRV evidence displays will be implemented here.</p>
      </div>
    </div>
  );
}