type HashTagItemProps = {
  onSelectCompany: (company: string) => void;
  company: string;
};

export default function HashTagItem({
  company,
  onSelectCompany,
}: HashTagItemProps) {
  return (
    <li key={company}>
      <button onClick={() => onSelectCompany(company)}>#{company}</button>
    </li>
  );
}
