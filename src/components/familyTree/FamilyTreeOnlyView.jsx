import FamilyTree from './FamilyTree';

export default function FamilyTreeOnlyView() {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <FamilyTree chartId="FamilyChart1" />
        </div>
    );
}
